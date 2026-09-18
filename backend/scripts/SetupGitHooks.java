import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class SetupGitHooks {
    public static void main(String[] args) throws Exception {
        // final String OS = System.getProperty("os.name").toLowerCase();
        // System.out.println(OS);
        Path gitHookDirPath = getGitHookDirectoryPath();
        System.out.println("깃 훅 폴더를 검색합니다.");
        createGitHookDirectory(gitHookDirPath);
        System.out.println("깃 훅 스크립트 파일들을 생성합니다.");
        GitHookScriptCreator[] creators = new GitHookScriptCreator[] {
            new PreCommitGitHookScript(gitHookDirPath),
            new PrePushGitHookScript(gitHookDirPath),
            new PreCommitBackendGitHookScript(gitHookDirPath),
            new PrePushBackendGitScriptHook(gitHookDirPath)
        };
        
        for (GitHookScriptCreator creator: creators) {
            creator.create();
        }
    }

    private static void createGitHookDirectory(Path path) throws IOException {
        if (Files.exists(path)) {
            System.out.println("\t✅ 폴더가 있습니다.");
            return;
        }
        System.out.println("\t⚠️ 폴더가 없어 생성합니다.");
        Files.createDirectories(path);
        System.out.println("\t📁 폴더를 생성했습니다.");
    }

    private static Path getGitHookDirectoryPath() {
        return getGitRepositoryPath()
            .resolve(".git")
            .resolve("hooks");
    }

    private static Path getGitRepositoryPath() {
        try {
            String output = executeProcess("git", "rev-parse", "--show-toplevel");
            return Paths.get(output);

        } catch (IOException e) {
            throw new IllegalStateException(
                    "git 명령어를 실행할 수 없습니다.",
                    e
            );

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();

            throw new IllegalStateException(
                    "git repository 경로 확인 중 인터럽트가 발생했습니다.",
                    e
            );
        }
    }

    private static String executeProcess(String... args) throws IOException, InterruptedException {
        Process process = new ProcessBuilder(args)
            .redirectErrorStream(true)
            .start();
        String output = new String(
            process.getInputStream().readAllBytes(),
            StandardCharsets.UTF_8
        ).trim();
        int exitCode = process.waitFor();
        if (exitCode != 0 || output.isBlank()) {
            throw new IllegalStateException("Git repository 경로를 찾을 수 없습니다.");
        }

        return output;
    }
}

abstract class GitHookScriptCreator {
    private final Path gitHookDirectoryPath;
    private final String scriptFileName;
    private final String script;

    protected GitHookScriptCreator(Path gitHookDirPath, String scriptFileName, String script) {
        this.gitHookDirectoryPath = gitHookDirPath;
        this.scriptFileName = scriptFileName;
        this.script = script;
    }

    public void create() throws IOException {
        System.out.println("\t" + scriptFileName + " 스크립트 파일 생성 시도합니다.");
        String normalizedScript = script.replace("\r\n", "\n");
        try {
            Files.writeString(
                gitHookDirectoryPath.resolve(scriptFileName), 
                normalizedScript, 
                StandardCharsets.UTF_8
            )
            .toFile()
            .setExecutable(true, false);
            System.out.println("\t\t✅ 성공했습니다.");
        } catch(IOException e) {
            System.out.println("\t\t❌ 실패했습니다.");
            throw e;
        }
    }
}

class PreCommitGitHookScript extends GitHookScriptCreator {
    private static final String SCRIPT_NAME = "pre-commit";
    private static final String SCRIPT = """
#!/bin/sh

PROJECT_ROOT="$(git rev-parse --show-toplevel)"

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR)

echo $PROJECT_ROOT
echo $STAGED_FILES

HAS_FRONTEND=$(printf '%s\\n' "$STAGED_FILES" | grep '^frontend/' || true)
HAS_BACKEND=$(printf '%s\\n' "$STAGED_FILES" | grep '^backend/' || true)

if [ -n "$HAS_FRONTEND" ]; then
    echo "📦 Frontend 변경 사항을 감지했습니다."

    "$PROJECT_ROOT/.git/hooks/pre-commit-frontend"

    if [ $? -ne 0 ]; then
        echo "❌ Frontend pre-commit 검증 실패."
        exit 1
    fi
fi

if [ -n "$HAS_BACKEND" ]; then
    echo "📦 Backend 변경 사항을 감지했습니다."

    "$PROJECT_ROOT/.git/hooks/pre-commit-backend"

    if [ $? -ne 0 ]; then
        echo "❌ Backend pre-commit 검증 실패."
        exit 1
    fi
fi

exit 0
""";
    public PreCommitGitHookScript(Path gitHookDirPath) {
        super(gitHookDirPath, SCRIPT_NAME, SCRIPT);
    }
}

class PreCommitBackendGitHookScript extends GitHookScriptCreator {
    private static final String SCRIPT_NAME = "pre-commit-backend";
    private static final String SCRIPT = """
#!/bin/sh

PROJECT_ROOT="$(git rev-parse --show-toplevel)"
BACKEND_ROOT="$PROJECT_ROOT/backend"

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR)

HAS_CORE=$(printf '%s\n' "$STAGED_FILES" | grep '^backend/core/' || true)
HAS_API=$(printf '%s\n' "$STAGED_FILES" | grep '^backend/api/' || true)
HAS_WEBSOCKET=$(printf '%s\n' "$STAGED_FILES" | grep '^backend/websocket/' || true)
HAS_BATCH=$(printf '%s\n' "$STAGED_FILES" | grep '^backend/batch/' || true)

echo "🔍 Backend pre-commit 검증을 시작합니다."

cd "$BACKEND_ROOT" || exit 1

if [ -n "$HAS_CORE" ]; then
    echo "🔍 Backend CORE 변경 사항을 감지했습니다."
    echo "🔍 Backend CORE test/build를 실행합니다."

    ./gradlew :core:test :core:build

    if [ $? -ne 0 ]; then
        echo "❌ Backend CORE 검증 실패!"
        echo "문제를 해결한 후 다시 커밋해 주세요."
        exit 1
    fi

    echo "✅ Backend CORE 검증 통과!"
fi

if [ -n "$HAS_API" ]; then
    echo "🔍 Backend API 변경 사항을 감지했습니다."
    echo "🔍 Backend API test/build를 실행합니다."

    ./gradlew :api:test :api:build

    if [ $? -ne 0 ]; then
        echo "❌ Backend API 검증 실패!"
        echo "문제를 해결한 후 다시 커밋해 주세요."
        exit 1
    fi

    echo "✅ Backend API 검증 통과!"
fi

if [ -n "$HAS_WEBSOCKET" ]; then
    echo "🔍 Backend WebSocket 변경 사항을 감지했습니다."
    echo "🔍 Backend WebSocket test/build를 실행합니다."

    ./gradlew :websocket:test :websocket:build

    if [ $? -ne 0 ]; then
        echo "❌ Backend WebSocket 검증 실패!"
        echo "문제를 해결한 후 다시 커밋해 주세요."
        exit 1
    fi

    echo "✅ Backend WebSocket 검증 통과!"
fi

if [ -n "$HAS_BATCH" ]; then
    echo "🔍 Backend Batch 변경 사항을 감지했습니다."
    echo "🔍 Backend Batch test/build를 실행합니다."

    ./gradlew :batch:test :batch:build

    if [ $? -ne 0 ]; then
        echo "❌ Backend Batch 검증 실패!"
        echo "문제를 해결한 후 다시 커밋해 주세요."
        exit 1
    fi

    echo "✅ Backend Batch 검증 통과!"
fi

echo "✅ Backend pre-commit 검증 통과!"
exit 0
""";
    public PreCommitBackendGitHookScript(Path gitHookDirPath) {
        super(gitHookDirPath, SCRIPT_NAME, SCRIPT);
    }
}


class PrePushGitHookScript extends GitHookScriptCreator {
    private static final String SCRIPT_NAME = "pre-push";
    private static final String SCRIPT = """
#!/bin/sh

PROJECT_ROOT="$(git rev-parse --show-toplevel)"

HAS_FRONTEND=0
HAS_BACKEND=0

ZERO_SHA="0000000000000000000000000000000000000000"

echo "$LOCAL_REF $LOCAL_SHA $REMOTE_REF $REMOTE_SHA"

while read -r LOCAL_REF LOCAL_SHA REMOTE_REF REMOTE_SHA
do
    # Frontend와 Backend를 모두 찾았다면
    # 더 이상 변경 파일을 확인할 필요가 없습니다.
    if [ "$HAS_FRONTEND" -eq 1 ] && [ "$HAS_BACKEND" -eq 1 ]; then
        break
    fi

    if [ "$REMOTE_SHA" = "$ZERO_SHA" ]; then

        PUSH_COMMITS=$(git rev-list "$LOCAL_SHA" --not --all)

        for COMMIT in $PUSH_COMMITS
        do
            CHANGED_FILES=$(git diff-tree \
                --root \
                --no-commit-id \
                --name-only \
                -r "$COMMIT")

            if [ "$HAS_FRONTEND" -eq 0 ]; then
                if printf '%s\n' "$CHANGED_FILES" | grep -q '^frontend/'; then
                    HAS_FRONTEND=1
                fi
            fi

            if [ "$HAS_BACKEND" -eq 0 ]; then
                if printf '%s\n' "$CHANGED_FILES" | grep -q '^backend/'; then
                    HAS_BACKEND=1
                fi
            fi

            if [ "$HAS_FRONTEND" -eq 1 ] && [ "$HAS_BACKEND" -eq 1 ]; then
                break
            fi
        done

    else

        CHANGED_FILES=$(git diff --name-only "$REMOTE_SHA" "$LOCAL_SHA")

        if printf '%s\n' "$CHANGED_FILES" | grep -q '^frontend/'; then
            HAS_FRONTEND=1
        fi

        if printf '%s\n' "$CHANGED_FILES" | grep -q '^backend/'; then
            HAS_BACKEND=1
        fi

    fi

done

if [ "$HAS_FRONTEND" -eq 1 ]; then
    echo "📦 Push 대상에 Frontend 변경 사항이 있습니다."

    "$PROJECT_ROOT/.git/hooks/pre-push-frontend"

    if [ $? -ne 0 ]; then
        echo "❌ Frontend pre-push 검증 실패."
        exit 1
    fi
fi

if [ "$HAS_BACKEND" -eq 1 ]; then
    echo "📦 Push 대상에 Backend 변경 사항이 있습니다."

    "$PROJECT_ROOT/.git/hooks/pre-push-backend"

    if [ $? -ne 0 ]; then
        echo "❌ Backend pre-push 검증 실패."
        exit 1
    fi
fi

exit 0
""";

    public PrePushGitHookScript(Path gitHookDirPath) {
        super(gitHookDirPath, SCRIPT_NAME, SCRIPT);
    }
}

class PrePushBackendGitScriptHook extends GitHookScriptCreator {
    private static final String SCRIPT_NAME = "pre-push-backend";
    private static final String SCRIPT = """
#!/bin/sh

echo "🔍 Backend test/build를 실행합니다."

PROJECT_ROOT="$(git rev-parse --show-toplevel)"
BACKEND_ROOT="$PROJECT_ROOT/backend"

cd $BACKEND_ROOT || exit 1

./gradlew build

if [ $? -ne 0 ]; then
    echo "❌ Backend test/build 검증 실패!"
    echo "문제를 해결한 후 다시 push 해주세요."
    exit 1
fi

echo "✅ Backend test/build 검증 통과!"

exit 0
""";

    public PrePushBackendGitScriptHook(Path gitHookDirPath) {
        super(gitHookDirPath, SCRIPT_NAME, SCRIPT);
    }
}

class NotInitializedError extends Error {
    constructor(contextName: string) {
        super(`${contextName} is not initialized.`);

        this.name = "NotInitializedError";
    }
}

export default NotInitializedError;
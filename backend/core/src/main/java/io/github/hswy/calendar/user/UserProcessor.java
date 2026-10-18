package io.github.hswy.calendar.user;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class UserProcessor {
    private final UserRepository repo;

    @RequireTransaction
    public UserEntity createNewUser() {
        return repo.save(
            UserEntity
                .builder()
                .build()
        );
    }

    @Cacheable(
        cacheNames = "USERS",
        key = "#userId"
    )
    public UserEntity getUser(Long userId) {
        Optional<UserEntity> entityOpt = repo.findById(userId);
        if (entityOpt.isEmpty()) {
            throw new UserNotFoundException(userId);
        }

        return entityOpt.get();
    }

    @RequireTransaction 
    @CacheEvict(
        cacheNames = "USERS",
        key = "#entity.userId"
    )
    public UserEntity changeStatus(UserEntity entity, UserStatus status) {
        // [TODO] user hisyoty
        entity.changeStatus(status);
        return entity;
    }
}

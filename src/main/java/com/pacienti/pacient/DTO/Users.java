package com.pacienti.pacient.DTO;

import java.util.List;

import com.pacienti.pacient.Model.UserDao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Users {
    private long totalElements;
    private int totalPages;
    private List<UserDao> users;

    public Users(long totalElements, int totalPages, List<UserDao> users) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.users = users;
    }
}

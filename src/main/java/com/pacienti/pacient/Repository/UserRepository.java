package com.pacienti.pacient.Repository;

import com.pacienti.pacient.Model.UserDao;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends  CrudRepository<UserDao, Integer> {

	UserDao findByEmail(String username);
}

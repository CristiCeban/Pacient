package com.pacienti.pacient.Repository;

import com.pacienti.pacient.Model.UserDao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<UserDao, Integer> {

	UserDao findByEmail(String username);

	Page<UserDao> findAllByOrderByIdDesc(Pageable pageable);

}

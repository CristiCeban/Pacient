package com.pacienti.pacient.Repository;

import com.pacienti.pacient.Model.PacientDao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PacientRepository extends PagingAndSortingRepository<PacientDao,Integer> {
    Page<PacientDao> findAllByOrderByIdDesc(Pageable pageable);

    boolean existsByCnp(String cnp);
}

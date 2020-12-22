package com.pacienti.pacient.Repository;

import com.pacienti.pacient.Model.RetetaDao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RetetaRepository extends PagingAndSortingRepository<RetetaDao,Integer>{
    Page<RetetaDao> findAllByOrderByNrretetaDesc(Pageable pageable);
}

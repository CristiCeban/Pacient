package com.pacienti.pacient.Repository;

import com.pacienti.pacient.Model.MedicamentDao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicamentRepository extends PagingAndSortingRepository<MedicamentDao,Integer>{
    Page<MedicamentDao> findAllByOrderByCodmedicamentDesc(Pageable pageable);
}
    


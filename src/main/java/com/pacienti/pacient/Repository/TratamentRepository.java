package com.pacienti.pacient.Repository;

import com.pacienti.pacient.CustomRepository.CustomProjectRepository;
import com.pacienti.pacient.Model.TratamentDao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TratamentRepository extends PagingAndSortingRepository<TratamentDao,Integer>,CustomProjectRepository{
    Page<TratamentDao> findAllByOrderByPozitieDesc(Pageable pageable);
}

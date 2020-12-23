package com.pacienti.pacient.Repository;

import com.pacienti.pacient.Model.DiagnosticDao;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DiagnosticRepository extends PagingAndSortingRepository<DiagnosticDao,Integer>{
    Page<DiagnosticDao> findAllByOrderByCodboalaDesc(Pageable pageable);
}

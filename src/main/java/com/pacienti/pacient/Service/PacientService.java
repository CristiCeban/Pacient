package com.pacienti.pacient.Service;

import com.pacienti.pacient.DTO.PacientDto;
import com.pacienti.pacient.DTO.PacientsDto;
import com.pacienti.pacient.Model.PacientDao;
import com.pacienti.pacient.Model.UserDao;
import com.pacienti.pacient.Repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class PacientService {
    @Autowired
    private PacientRepository pacientRepository;

    
    public PacientsDto getPacients(int page, int size, UserDao user) {
        Pageable pageRequest = PageRequest.of(page,size);

        Page<PacientDao> pacientPage = pacientRepository.findAllByOrderByIdDesc(pageRequest);
        List<PacientDao> pacientList = pacientPage.getContent();


        long totalElements = pacientPage.getTotalElements();
        int totalPages = pacientPage.getTotalPages();

        return new PacientsDto(totalElements,totalPages,pacientList);
    }
}

package com.pacienti.pacient.Service;

import java.util.List;

import com.pacienti.pacient.DTO.DiagnosticDto;
import com.pacienti.pacient.DTO.Diagnostice;
import com.pacienti.pacient.Model.DiagnosticDao;
import com.pacienti.pacient.Repository.DiagnosticRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DiagnosticService {
    @Autowired
    private DiagnosticRepository diagnosticRepository;

    // @Autowired
    // private PacientRepository pacientRepository;


    public void addDiagnostic(DiagnosticDto diagnosticInfo){
        DiagnosticDao diagnostic = new DiagnosticDao();

        diagnostic.setDenumire(diagnosticInfo.getDenumire());
        diagnostic.setTip(diagnosticInfo.getTip());
        

        diagnosticRepository.save(diagnostic);
    }

    public void removeDiagnostic(Integer id){
        diagnosticRepository.deleteById(id);
    }

    public void updateDiagnostic(DiagnosticDto diagnosticInfo){

        DiagnosticDao diagnostic = diagnosticRepository.findById(diagnosticInfo.getCodboala()).orElseThrow();

        diagnostic.setDenumire(diagnosticInfo.getDenumire());
        diagnostic.setTip(diagnosticInfo.getTip());

        diagnosticRepository.save(diagnostic);
    }

    public Diagnostice getDiagnostice(int page,int size){
        Pageable pageRequest = PageRequest.of(page,size);

        Page<DiagnosticDao> diagnostice = diagnosticRepository.findAllByOrderByCodboalaDesc(pageRequest);

        List<DiagnosticDao> listaDiagnostice = diagnostice.getContent();
        

        long totalElements = diagnostice.getTotalElements();
        int totalPages = diagnostice.getTotalPages();

        return new Diagnostice(totalElements,totalPages,listaDiagnostice);

    }
}

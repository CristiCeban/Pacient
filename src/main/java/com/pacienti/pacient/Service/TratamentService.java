package com.pacienti.pacient.Service;

import java.util.List;

import com.pacienti.pacient.DTO.TratamentDto;
import com.pacienti.pacient.DTO.Tratamente;
import com.pacienti.pacient.Model.DiagnosticDao;
import com.pacienti.pacient.Model.MedicamentDao;
import com.pacienti.pacient.Model.PacientDao;
import com.pacienti.pacient.Model.TratamentDao;
import com.pacienti.pacient.Repository.DiagnosticRepository;
import com.pacienti.pacient.Repository.MedicamentRepository;
import com.pacienti.pacient.Repository.PacientRepository;
import com.pacienti.pacient.Repository.TratamentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TratamentService {
    @Autowired
    private TratamentRepository tratamentRepository;

    @Autowired
    private PacientRepository pacientRepository;

    @Autowired
    private MedicamentRepository medicamentRepository;

    @Autowired
    private DiagnosticRepository diagnosticRepository;


    public void addTratament(TratamentDto tratamentInfo){
        TratamentDao newTratament = new TratamentDao();



        newTratament.setCantitate(tratamentInfo.getCantitate());


        newTratament.setDiagnostic(diagnosticRepository.findById(tratamentInfo.getDiagnosticId()).orElseThrow());

        newTratament.setPacient(pacientRepository.findById(tratamentInfo.getPacientId()).orElseThrow());

        newTratament.setMedicament(medicamentRepository.findById(tratamentInfo.getCodmedicament()).orElseThrow());
        

        tratamentRepository.save(newTratament);
        
    }

    public void removeTratament(Integer id){
         tratamentRepository.deleteById(id);
    }

    public void updateTratament(TratamentDto tratamentInfo){
    
        TratamentDao tratamentDao = tratamentRepository.findById(tratamentInfo.getPozitie()).orElseThrow();

        DiagnosticDao diagnostic = diagnosticRepository.findById(tratamentInfo.getDiagnosticId()).orElseThrow();
        
        MedicamentDao medicament = medicamentRepository.findById(tratamentInfo.getCodmedicament()).orElseThrow();

        PacientDao pacient = pacientRepository.findById(tratamentInfo.getPacientId()).orElseThrow();
        tratamentDao.setCantitate(tratamentInfo.getCantitate());
        tratamentDao.setDiagnostic(diagnostic);
        tratamentDao.setMedicament(medicament);
        tratamentDao.setPacient(pacient);
        
        tratamentRepository.save(tratamentDao);
    }

    public Tratamente getRetete(int page,int size){
        Pageable pageRequest = PageRequest.of(page,size);

        Page<TratamentDao> tratamente = tratamentRepository.findAllByOrderByPozitieDesc(pageRequest);

        List<TratamentDao> listaTratamente = tratamente.getContent();

        long totalElements = tratamente.getTotalElements();
        int totalPages = tratamente.getTotalPages();

        return new Tratamente(totalElements,totalPages,listaTratamente);
 
    }
}

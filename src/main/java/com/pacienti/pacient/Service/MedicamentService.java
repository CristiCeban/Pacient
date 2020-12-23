package com.pacienti.pacient.Service;

import java.util.List;

import com.pacienti.pacient.DTO.MedicamentDto;
import com.pacienti.pacient.DTO.Medicamente;
import com.pacienti.pacient.Model.MedicamentDao;
import com.pacienti.pacient.Repository.MedicamentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MedicamentService {
    @Autowired
    private MedicamentRepository medicamentRepository;

    public void addReteta(MedicamentDto retetaInfo){
        MedicamentDao newMedicament = new MedicamentDao();

        newMedicament.setDenumiremedicament(retetaInfo.getDenumire());
        medicamentRepository.save(newMedicament);
        
    }

    public void removeReteta(Integer id){
        medicamentRepository.deleteById(id);
    }

    public void updateReteta(MedicamentDto medicamentInfo){
    
        MedicamentDao medicamentDao = medicamentRepository.findById(medicamentInfo.getCodmedicament()).orElseThrow();

        medicamentDao.setDenumiremedicament(medicamentInfo.getDenumire());

        
        medicamentRepository.save(medicamentDao);
    }

    public Medicamente getRetete(int page,int size){
        Pageable pageRequest = PageRequest.of(page,size);

        Page<MedicamentDao> medicamente = medicamentRepository.findAllByOrderByCodmedicamentDesc(pageRequest);

        List<MedicamentDao> listaMedicamente = medicamente.getContent();
        
        long totalElements = medicamente.getTotalElements();
        int totalPages = medicamente.getTotalPages();

        return new Medicamente(totalElements,totalPages,listaMedicamente);
 
    }

}

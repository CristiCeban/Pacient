package com.pacienti.pacient.Service;

import com.pacienti.pacient.DTO.TratamentMedicament;
import com.pacienti.pacient.Repository.TratamentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdditionalService {
    @Autowired
    private TratamentRepository additionalRepository;


    public TratamentMedicament getMedicamentPerMedic(){
        return additionalRepository.getMedicamentToMedic();
    }
}

package com.pacienti.pacient.Service;

import com.pacienti.pacient.DTO.RetetaDto;
import com.pacienti.pacient.Model.RetetaDao;
import com.pacienti.pacient.Repository.RetetaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class RetetaService {
    

    @Autowired
    private RetetaRepository retetaRepository;


    public void addReteta(RetetaDto retetaInfo){
        RetetaDao newReteta = new RetetaDao();

        newReteta.setCodfiscal(retetaInfo.getCodfiscal());
        newReteta.setJudet(retetaInfo.getJudet());
        newReteta.setNrasigmed(retetaInfo.getNrasigmed());
        newReteta.setUnitatemedicala(retetaInfo.getUnitatemedicala());

        retetaRepository.save(newReteta);
        
    }
}

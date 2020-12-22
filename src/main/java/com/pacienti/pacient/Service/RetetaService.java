package com.pacienti.pacient.Service;

import java.util.List;

import com.pacienti.pacient.DTO.RetetaDto;
import com.pacienti.pacient.Model.RetetaDao;
import com.pacienti.pacient.Model.Retete;
import com.pacienti.pacient.Repository.RetetaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public void removeReteta(Integer id){
         retetaRepository.deleteById(id);
    }

    public void updateReteta(RetetaDto retetaInfo){
    
        RetetaDao reteta = retetaRepository.findById(retetaInfo.getNrreteta()).orElseThrow();

        reteta.setCodfiscal(retetaInfo.getCodfiscal());
        reteta.setJudet(retetaInfo.getJudet());
        reteta.setNrasigmed(retetaInfo.getNrasigmed());
        reteta.setUnitatemedicala(retetaInfo.getUnitatemedicala());
        
        retetaRepository.save(reteta);
    }

    public Retete getRetete(int page,int size){
        Pageable pageRequest = PageRequest.of(page,size);

        Page<RetetaDao> retete = retetaRepository.findAllByOrderByNrretetaDesc(pageRequest);

        List<RetetaDao> listaRetete = retete.getContent();

        long totalElements = retete.getTotalElements();
        int totalPages = retete.getTotalPages();

        return new Retete(totalElements,totalPages,listaRetete);
 
    }
}

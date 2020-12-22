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

    public void addPacient(PacientDto pacient,UserDao user){
        PacientDao pDao = new PacientDao();

        pDao.setCnp(pacient.getCnp());
        pDao.setNume(pacient.getNume());
        pDao.setPrenume(pacient.getPrenume());
        pDao.setTipasig(pacient.getTipasig());
        pDao.setVarsta(pacient.getVarsta());
        pDao.setUser(user);
        pacientRepository.save(pDao);
    }

    public void deletePacient(Integer id){
        pacientRepository.deleteById(id);
    }
    

    public void updatePacient(PacientDto pacient,Integer id){
        PacientDao pDao = pacientRepository.findById(id).orElseThrow();

        pDao.setCnp(pacient.getCnp());
        pDao.setNume(pacient.getNume());
        pDao.setPrenume(pacient.getPrenume());
        pDao.setTipasig(pacient.getTipasig());
        pDao.setVarsta(pacient.getVarsta());

        pacientRepository.save(pDao);
    }

    public boolean isExistent(Long cnp){
        return pacientRepository.existsByCnp(cnp);
    }
}

package com.pacienti.pacient.Controller;

import com.pacienti.pacient.DTO.RetetaDto;
import com.pacienti.pacient.Model.RetetaDao;
import com.pacienti.pacient.Model.Retete;
import com.pacienti.pacient.Service.RetetaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/reteta")
public class RetetaController {
    @Autowired
    private RetetaService retetaService;

    @PostMapping
    public ResponseEntity<?> addReteta(@RequestBody RetetaDto reteta){

        retetaService.addReteta(reteta);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public Retete getRetete(@RequestParam Integer page,@RequestParam Integer size){
        return retetaService.getRetete(page, size);
    }

    @GetMapping(value = "/delete")
    public void deleteReteta(@RequestParam Integer id){
        retetaService.removeReteta(id);
    }

    @PostMapping(value = "/update")
    public void updateReteta(@RequestBody RetetaDto reteta){
        retetaService.updateReteta(reteta);
    }
}

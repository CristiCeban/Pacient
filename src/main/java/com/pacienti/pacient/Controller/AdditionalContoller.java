package com.pacienti.pacient.Controller;

import com.pacienti.pacient.DTO.TratamentMedicament;
import com.pacienti.pacient.Service.AdditionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/stat")
public class AdditionalContoller {
    @Autowired
    private AdditionalService additionalService;


    @GetMapping(value = "/medicamentpermedic")
    public TratamentMedicament getTratamentMedicament(){
        return additionalService.getMedicamentPerMedic();
    }
}

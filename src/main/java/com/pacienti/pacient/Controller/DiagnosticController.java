package com.pacienti.pacient.Controller;

import com.pacienti.pacient.DTO.DiagnosticDto;
import com.pacienti.pacient.DTO.Diagnostice;
import com.pacienti.pacient.Repository.DiagnosticRepository;
import com.pacienti.pacient.Service.DiagnosticService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/diagnostic")
public class DiagnosticController {
    @Autowired
    private DiagnosticService diagnosticService;


    @PostMapping
    public ResponseEntity<?> addReteta(@RequestBody DiagnosticDto diagnosticInfo){

        diagnosticService.addDiagnostic(diagnosticInfo);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public Diagnostice getDiagnostic(@RequestParam Integer page,@RequestParam Integer size){
        return diagnosticService.getDiagnostice(page, size);
    }

    @GetMapping(value = "/delete")
    public void deleteDiagnostic(@RequestParam Integer id){
        diagnosticService.removeDiagnostic(id);
    }

    @PostMapping(value = "/update")
    public void updateDiagnostic(@RequestBody DiagnosticDto diagnostic){
        diagnosticService.updateDiagnostic(diagnostic);
    }
}

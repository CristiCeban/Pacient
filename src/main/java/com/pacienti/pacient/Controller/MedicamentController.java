package com.pacienti.pacient.Controller;

import com.pacienti.pacient.DTO.MedicamentDto;
import com.pacienti.pacient.DTO.RetetaDto;
import com.pacienti.pacient.Model.Medicamente;
import com.pacienti.pacient.Service.MedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medicament")
public class MedicamentController {
    @Autowired
    private MedicamentService medicamentService;

    @GetMapping
    public Medicamente getMedicaments(@RequestParam Integer page, @RequestParam Integer size){
        return medicamentService.getMedicamente(page, size);
    }

    @PostMapping
    public ResponseEntity<?> addMedicament(@RequestBody MedicamentDto medicament){
        medicamentService.addMedicament(medicament);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/delete")
    public void deleteMedicament(@RequestParam Integer id){
        medicamentService.removeMedicament(id);
    }

    @PostMapping(value = "/update")
    public void updateMedicament(@RequestBody MedicamentDto medicament){
        medicamentService.updateMedicament(medicament);
    }
}

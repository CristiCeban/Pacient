package com.pacienti.pacient.DTO;

import java.util.List;
import java.util.Optional;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TratamentMedicament {
    private List<Integer>  medicId;
    private List<Integer>  codmedicament;
    private List<Double> cantitate;

    public TratamentMedicament(Object[] columns) {
        

    }

    public TratamentMedicament(List<Integer> medicId, List<Integer> codmedicament, List<Double> cantitate) {
        this.medicId = medicId;
        this.codmedicament = codmedicament;
        this.cantitate = cantitate;
    }


    
}

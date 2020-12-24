package com.pacienti.pacient.DTO;

import java.util.List;
import java.util.Optional;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TratamentMedicament {
    private Integer  medicId;
    private Integer  codmedicament;
    private Double cantitate;

    public TratamentMedicament(Object[] columns) {
        this.medicId = (columns[0] != null)?((Integer)columns[0]).intValue():0;
        this.codmedicament = (columns[1] != null)?((Integer)columns[0]).intValue():0;
        this.cantitate = (columns[2] != null)?((Double)columns[0]).doubleValue():0;
        

    }



    
}

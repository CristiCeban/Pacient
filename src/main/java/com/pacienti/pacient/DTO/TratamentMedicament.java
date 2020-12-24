package com.pacienti.pacient.DTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TratamentMedicament {
    private BigDecimal  medicId;
    private BigDecimal codmedicament;
    private BigDecimal cantitate;

    public TratamentMedicament(Object[] columns) {
        this.medicId = (columns[0] != null)?( (BigDecimal)columns[0] ) : BigDecimal.valueOf(0);
        this.codmedicament = (columns[1] != null)?( (BigDecimal)columns[1] ) : BigDecimal.valueOf(0);
        this.cantitate = (columns[2] != null)?( (BigDecimal)columns[2] ) : BigDecimal.valueOf(0);


    }




}

package com.pacienti.pacient.DTO;

import java.math.BigDecimal;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RetetaPacient {
    private BigDecimal  pacientId;
    private BigDecimal nrRetete;


    public RetetaPacient(Object[] columns) {
        this.pacientId = (columns[0] != null)?( (BigDecimal)columns[0] ) : BigDecimal.valueOf(-1);
        this.nrRetete = (columns[1] != null)?( (BigDecimal)columns[1] ) : BigDecimal.valueOf(-1);
    }
}

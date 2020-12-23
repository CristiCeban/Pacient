package com.pacienti.pacient.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RetetaDto {
    private Integer nrreteta;
    private String codfiscal;
    private String unitatemedicala;
    private String judet;
    private String nrasigmed;
    private Integer pacientId;
}

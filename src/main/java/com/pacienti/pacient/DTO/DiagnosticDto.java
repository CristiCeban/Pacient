package com.pacienti.pacient.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiagnosticDto {
    private Integer codboala;

    private String denumire;

    private String tip;

    public DiagnosticDto(Integer codboala, String denumire, String tip) {
        this.codboala = codboala;
        this.denumire = denumire;
        this.tip = tip;
    }

    
}

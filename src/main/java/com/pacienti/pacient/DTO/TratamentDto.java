package com.pacienti.pacient.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TratamentDto {
    private Integer pozitie;
    private Double cantitate;
    private Integer codmedicament;
    private Integer diagnosticId;
    private Integer pacientId;
    private Integer userId;

    public TratamentDto(Double cantitate, Integer codmedicament, Integer diagnosticId, Integer pacientId) {
        this.cantitate = cantitate;
        this.codmedicament = codmedicament;
        this.diagnosticId = diagnosticId;
        this.pacientId = pacientId;
    }


}

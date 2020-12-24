package com.pacienti.pacient.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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

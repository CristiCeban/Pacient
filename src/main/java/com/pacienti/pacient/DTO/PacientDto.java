package com.pacienti.pacient.DTO;

import com.pacienti.pacient.Model.UserDao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PacientDto {

    private Long cnp;
    private String nume;

    private String prenume;

    private Integer varsta;

    private String tipasig;

    public PacientDto(Long cnp, String nume, String prenume, Integer varsta, String tipasig) {
        this.cnp = cnp;
        this.nume = nume;
        this.prenume = prenume;
        this.varsta = varsta;
        this.tipasig = tipasig;
    }

  
}

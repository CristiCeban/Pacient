package com.pacienti.pacient.DTO;

import com.pacienti.pacient.Model.UserDao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PacientDto {
    private Integer id;
    private String cnp;
    private String nume;

    private String prenume;

    private Integer varsta;

    private String tipasig;
    private UserDao user;

    public PacientDto(Integer id,String cnp,String nume,String prenume,Integer varsta,String tipasig,UserDao user) {
        this.id = id;
        this.cnp = cnp;
        this.nume = nume;
        this.prenume = prenume;
        this.varsta = varsta;
        this.tipasig = tipasig;
        this.user = user;
    }
}

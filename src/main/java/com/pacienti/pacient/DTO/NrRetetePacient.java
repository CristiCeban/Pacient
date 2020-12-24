package com.pacienti.pacient.DTO;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NrRetetePacient {
    private List retetePacienti;

    public NrRetetePacient(List<RetetaPacient> nretetapacient){
        this.retetePacienti = nretetapacient;
    }
}

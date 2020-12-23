package com.pacienti.pacient.Model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Medicamente {
    private long totalElements;
    private long totalPages;
    private List<MedicamentDao> medicamente;


    public Medicamente(long totalElements, int totalPages, List<MedicamentDao> listaMedicamente) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.medicamente = listaMedicamente;
    }

}

package com.pacienti.pacient.Model;

import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Retete {
    private long totalElements;
    private int totalPages;
    private List<RetetaDao> retete;

    public Retete(long totalElements, int totalPages, List<RetetaDao> retete) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.retete = retete;
    }
}

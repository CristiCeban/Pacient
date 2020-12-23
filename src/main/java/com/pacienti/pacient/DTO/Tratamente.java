package com.pacienti.pacient.DTO;

import java.util.List;

import com.pacienti.pacient.Model.TratamentDao;

public class Tratamente {
    private long totalElements;
    private int totalPages;
    private List<TratamentDao> pacients;

    public Tratamente(long totalElements, int totalPages, List<TratamentDao> pacients) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.pacients = pacients;
    }
}

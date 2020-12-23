package com.pacienti.pacient.DTO;

import java.util.List;

import com.pacienti.pacient.Model.DiagnosticDao;

public class Diagnostice {
    private long totalElements;
    private long totalPages;
    private List<DiagnosticDao> medicamente;

    public Diagnostice(long totalElements, long totalPages, List<DiagnosticDao> medicamente) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.medicamente = medicamente;
    }
    
    
}

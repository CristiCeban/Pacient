package com.pacienti.pacient.DTO;

import java.util.List;

import com.pacienti.pacient.Model.DiagnosticDao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Diagnostice {
    private long totalElements;
    private long totalPages;
    private List<DiagnosticDao> diagnoze;

    public Diagnostice(long totalElements, long totalPages, List<DiagnosticDao> diagnoze) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.diagnoze = diagnoze;
    }


}

package com.pacienti.pacient.DTO;

import com.pacienti.pacient.Model.PacientDao;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PacientsDto {
    private long totalElements;
    private int totalPages;
    private List<PacientDao> pacients;
}


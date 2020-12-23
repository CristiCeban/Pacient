package com.pacienti.pacient.DTO;

import java.util.List;

import com.pacienti.pacient.Model.MedicamentDao;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Medicamente {


    public Medicamente(long totalElements, int totalPages, List<MedicamentDao> listaMedicamente) {
	}
    private long totalElements;
    private long totalPages;
	private List<MedicamentDao> medicamente;
}

package com.pacienti.pacient.DTO;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TratamenteMedicamente {
    private List tratamenteMedicamente;

    public TratamenteMedicamente(List<TratamentMedicament> tratamenteMedicamente){
        this.tratamenteMedicamente = tratamenteMedicamente;
    }
}

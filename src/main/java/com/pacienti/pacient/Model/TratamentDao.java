package com.pacienti.pacient.Model;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SqlResultSetMapping;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pacienti.pacient.DTO.TratamentMedicament;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@SqlResultSetMapping(name = "MedicinePerDoctor", classes = {
    @ConstructorResult(targetClass = TratamentMedicament.class,
    columns = {
        @ColumnResult(name = "medic_id"),
        @ColumnResult(name = "cod_medicament"),
        @ColumnResult(name = "cantitati")
    })
})




@Getter
@Setter
@NoArgsConstructor
@Entity(name = "tratament")
public class TratamentDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pozitie;

    @ManyToOne
    @JoinColumn(name = "diagnostic_id")
    private DiagnosticDao diagnostic;

    @ManyToOne
    @JoinColumn(name = "cod_medicament")
    private MedicamentDao medicament;

    private Double cantitate;


    @ManyToOne
    @JoinColumn(name = "pacient_id")
    private PacientDao pacient;

    @ManyToOne
    @JoinColumn(name = "medic_id")
    private UserDao user;

}

package com.pacienti.pacient.Model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "medicamente")
public class MedicamentDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_medicament")
    private Integer codmedicament;

    @Column(name = "denumire_medicament")
    private String denumiremedicament;

    @JsonIgnore
    @OneToMany(mappedBy = "medicament")
    private List<TratamentDao>  tratament;
}

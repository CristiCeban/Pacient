package com.pacienti.pacient.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "reteta")
public class RetetaDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nr_reteta")
    private Integer nrreteta;

    @Column(name = "cod_fiscal")
    private String codfiscal;

    private String unitatemedicala;

    private String judet;

    @Column(name = "nr_casa_asig_medic")
    private String nrasigmed;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "pacient_id")
    private PacientDao pacient;

    
}

package com.pacienti.pacient.Model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "tratament")
public class TratamentDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pozitie;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "tratament_diagnostic",joinColumns = @JoinColumn(name = "tratament_id",referencedColumnName = "pozitie"),
                                             inverseJoinColumns = @JoinColumn(name = "diagnostic_id",referencedColumnName = "codboala"))
    private List<DiagnosticDao> diagnostics;
    
    @Column(name = "cod_medicament")
    private Integer codmedicament;

    @Column(name = "denumire_medicament")
    private String denumiremedicament;

    private Double cantitate;

}

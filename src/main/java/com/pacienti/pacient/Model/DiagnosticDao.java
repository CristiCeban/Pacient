package com.pacienti.pacient.Model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "diagnostic")
public class DiagnosticDao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer codboala;

    private String denumire;

    private String tip;

    @ManyToMany(mappedBy = "diagnostics")
    private List<TratamentDao> tratament;

    

}

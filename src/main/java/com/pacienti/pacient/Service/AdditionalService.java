package com.pacienti.pacient.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.pacienti.pacient.DTO.NrRetetePacient;
import com.pacienti.pacient.DTO.RetetaPacient;
import com.pacienti.pacient.DTO.TratamentMedicament;
import com.pacienti.pacient.DTO.TratamenteMedicamente;
import com.pacienti.pacient.Repository.ProjectRepository;
import com.pacienti.pacient.Repository.TratamentRepository;

import org.hibernate.type.AnyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdditionalService {
    @PersistenceContext
    private EntityManager em;


    public TratamenteMedicamente getMedicamentPerMedic(){
        String queryString = "select medic_id,cod_medicament,sum(cantitate) as cantitati from tratament  GROUP BY ROLLUP(medic_id,cod_medicament)";
        try {
            Query query = em.createNativeQuery(queryString);
            List results = em.createNativeQuery(queryString).getResultList();
            List returnedList = new ArrayList();
            for (Object itVar : results)
            {
                TratamentMedicament temp =  new TratamentMedicament((Object[]) itVar);
                returnedList.add(temp);
            }

            return new TratamenteMedicamente(returnedList);
            } catch (Exception e) {
           e.printStackTrace();
        }

        return null;
    }

    public NrRetetePacient getRetetePerPacient(){
            String queryString = "select pacient_id,COUNT(nr_reteta) as nr from reteta  GROUP BY ROLLUP(pacient_id)";
            try {
                Query query = em.createNativeQuery(queryString);
                List results = em.createNativeQuery(queryString).getResultList();
                List returnedList = new ArrayList();
                for (Object itVar : results)
                {
                    RetetaPacient temp =  new RetetaPacient((Object[]) itVar);
                    returnedList.add(temp);
                }
    
                return new NrRetetePacient(returnedList);
                } catch (Exception e) {
               e.printStackTrace();
            }
    
            return null;
    }
}

package com.pacienti.pacient.Controller;

import java.util.HashMap;
import java.util.Map;

import com.pacienti.pacient.DTO.PacientDto;
import com.pacienti.pacient.DTO.PacientsDto;
import com.pacienti.pacient.Model.UserDao;
import com.pacienti.pacient.Service.JwtUserDetailsService;
import com.pacienti.pacient.Service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import oracle.jdbc.proxy.annotation.Post;

@RestController
@RequestMapping(path="/api/pacient")
public class PacientController {
    @Autowired
    private PacientService pacientService;

    @Autowired
    private JwtUserDetailsService userService;

    @GetMapping
    public PacientsDto getPacients(@RequestParam("page") int page, @RequestParam("size") int size,
                                   Authentication authentication) {
        UserDao user = userService.currentUser(authentication);

        return pacientService.getPacients(page,size,user);
    }

    @PostMapping
    public ResponseEntity<?> addPacient(@RequestBody PacientDto pacient,Authentication authentication){
        UserDao user = userService.currentUser(authentication);

        pacientService.addPacient(pacient, user);

        return ResponseEntity.ok("Pacient added");
    }

    @GetMapping(value = "/delete")
    public ResponseEntity<?> deletePacient(@RequestParam Integer id){
        pacientService.deletePacient(id);

        return ResponseEntity.ok("Pacient deleted");
    }

    @PostMapping(value = "/update")
    public ResponseEntity<?> updatePacient(@RequestBody PacientDto pacient,@RequestParam Integer id){
       pacientService.updatePacient(pacient, id);

       return ResponseEntity.noContent().build();


    }

    @GetMapping(value = "/exist")
    public ResponseEntity<Object> existPacient(@RequestParam Long cnp){
        boolean exist = pacientService.isExistent(cnp);

        Map<String,Object> map = new HashMap<>(2);
        map.put("exist", exist);

        return ResponseEntity.ok(map);
    }

    
}

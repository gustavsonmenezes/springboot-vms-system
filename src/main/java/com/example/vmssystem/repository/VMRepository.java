package com.example.vmssystem.repository;

import com.example.vmssystem.entity.VirtualMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VMRepository extends JpaRepository<VirtualMachine, Long> {

}
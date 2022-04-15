<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VaccinationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=VaccinationRepository::class)
 */
#[ApiResource]
class Vaccination
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_vaccination;

    /**
     * @ORM\OneToOne(targetEntity=Vaccin::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $vaccin;

    /**
     * @ORM\ManyToOne(targetEntity=Patient::class, inversedBy="vaccinations")
     */
    private $patient;

    /**
     * @ORM\ManyToOne(targetEntity=Infirmier::class, inversedBy="vaccinations")
     */
    private $infirmier;


    public function getId(): ?int
    {
        return $this->id;
    }


    public function getDateVaccination(): ?\DateTimeInterface
    {
        return $this->date_vaccination;
    }

    public function setDateVaccination(\DateTimeInterface $date_vaccination): self
    {
        $this->date_vaccination = $date_vaccination;

        return $this;
    }

    public function getVaccin(): ?vaccin
    {
        return $this->vaccin;
    }

    public function setVaccin(vaccin $vaccin): self
    {
        $this->vaccin = $vaccin;

        return $this;
    }

    public function getPatient(): ?patient
    {
        return $this->patient;
    }

    public function setPatient(?patient $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    public function getInfirmier(): ?infirmier
    {
        return $this->infirmier;
    }

    public function setInfirmier(?infirmier $infirmier): self
    {
        $this->infirmier = $infirmier;

        return $this;
    }
}

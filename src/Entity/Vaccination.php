<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VaccinationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;

/**
 * @ORM\Entity(repositoryClass=VaccinationRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['vaccination_read']],
    attributes: ["pagination_enabled" => false]
)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'infirmier' => 'exact'])]
#[ApiFilter(DateFilter::class, properties: ['date_vaccination'])]
class Vaccination
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vaccination_read", "sejour_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"vaccination_read", "sejour_read"})
     */
    private $date_vaccination;

    /**
     * @ORM\OneToOne(targetEntity=Vaccin::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"vaccination_read", "sejour_read"})
     */
    private $vaccin;

    /**
     * @ORM\ManyToOne(targetEntity=Patient::class, inversedBy="vaccinations")
     * @Groups({"vaccination_read"})
     */
    private $patient;

    /**
     * @ORM\ManyToOne(targetEntity=Infirmier::class, inversedBy="vaccinations")
     * @Groups({"vaccination_read", "sejour_read"})
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

<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SejourRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SejourRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['sejour_read']]
)]
class Sejour
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"sejour_read", "patients_read", "lits_read"})
     *
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"sejour_read", "patients_read", "lits_read"})
     */
    private $dateEntree;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"sejour_read", "patients_read", "lits_read"})
     */
    private $dateSortie;

    /**
     * @ORM\ManyToOne(targetEntity=Patient::class, inversedBy="sejours")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"sejour_read", "lits_read"})
     */
    private $patient;

    /**
     * @ORM\ManyToOne(targetEntity=Lit::class, inversedBy="sejours")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"sejour_read", "patients_read"})
     */
    private $lit;

    /**
     * @ORM\OneToMany(targetEntity=ServiceSejour::class, mappedBy="sejour")
     * @Groups({"sejour_read", "patients_read", "lits_read"})
     */
    private $services;

    public function __construct()
    {
        $this->services = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateEntree(): ?\DateTimeInterface
    {
        return $this->dateEntree;
    }

    public function setDateEntree(\DateTimeInterface $dateEntree): self
    {
        $this->dateEntree = $dateEntree;

        return $this;
    }

    public function getDateSortie(): ?\DateTimeInterface
    {
        return $this->dateSortie;
    }

    public function setDateSortie(?\DateTimeInterface $dateSortie): self
    {
        $this->dateSortie = $dateSortie;

        return $this;
    }

    public function getPatient(): ?Patient
    {
        return $this->patient;
    }

    public function setPatient(?Patient $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    public function getLit(): ?Lit
    {
        return $this->lit;
    }

    public function setLit(?Lit $lit): self
    {
        $this->lit = $lit;

        return $this;
    }

    /**
     * @return Collection|ServiceSejour[]
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(ServiceSejour $service): self
    {
        if (!$this->services->contains($service)) {
            $this->services[] = $service;
            $service->setSejour($this);
        }

        return $this;
    }

    public function removeService(ServiceSejour $service): self
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getSejour() === $this) {
                $service->setSejour(null);
            }
        }

        return $this;
    }
}

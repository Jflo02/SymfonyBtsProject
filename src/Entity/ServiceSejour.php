<?php

namespace App\Entity;

use App\Repository\ServiceSejourRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ServiceSejourRepository::class)
 */
class ServiceSejour
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
    private $dateEntree;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateSortie;

    /**
     * @ORM\ManyToOne(targetEntity=Sejour::class, inversedBy="services")
     * @ORM\JoinColumn(nullable=false)
     */
    private $sejour;

    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="sejours")
     * @ORM\JoinColumn(nullable=false)
     */
    private $service;

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

    public function getSejour(): ?Sejour
    {
        return $this->sejour;
    }

    public function setSejour(?Sejour $sejour): self
    {
        $this->sejour = $sejour;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): self
    {
        $this->service = $service;

        return $this;
    }
}

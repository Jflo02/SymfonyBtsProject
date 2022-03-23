<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CreneauInfirmierRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CreneauInfirmierRepository::class)
 */
#[ApiResource]
class CreneauInfirmier
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
    private $date_vaccin;

    /**
     * @ORM\ManyToOne(targetEntity=infirmier::class, inversedBy="creneauinfirmiers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $infirmier;


    public function __construct()
    {
        $this->infirmier = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateVaccin(): ?\DateTimeInterface
    {
        return $this->date_vaccin;
    }

    public function setDateVaccin(\DateTimeInterface $date_vaccin): self
    {
        $this->date_vaccin = $date_vaccin;

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
